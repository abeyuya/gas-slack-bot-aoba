
import { uniqPickup } from "../util";

const targetOrganizations: string[] = JSON.parse(process.env.GITHUB_TARGET_ORGS || "[]");
const accessToken = process.env.GITHUB_ACCESS_TOKEN || "";
const endpoint = "https://api.github.com/graphql";

const buildRequestOption = (graphql: string) => {
  return {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
    payload: JSON.stringify({ query: graphql }),
  };
};

interface IUser {
  url: string;
}

interface IReviewRequests {
  requestedReviewer: IUser;
}

interface IPullRequest {
  url: string;
  title: string;
  reviewRequests: {
    nodes: IReviewRequests[],
  };
}

interface IRepository {
  name: string;
  url: string;
  pullRequests: {
    nodes: IPullRequest[],
  };
}

interface IOrganization {
  name: string;
  url: string;
  repositories: {
    nodes: IRepository[],
  };
}

interface IAssignedPullRequestsResponse {
  data: {
    user: {
      organizations: {
        nodes: IOrganization[],
      },
    },
  };
}

export interface IAssignedInfo {
  orgName: string;
  assignedPrRepos: IAssignedPrRepo[];
}

export const getAssignedPullRequests = (username: string) => {
  const graphql = buildAssignedPullRequestsGql(username);
  const option = buildRequestOption(graphql);
  const res = UrlFetchApp.fetch(endpoint, option as any);

  const json: IAssignedPullRequestsResponse = JSON.parse(res.getContentText());
  const result = pickAssignedPr(username, json);

  return result;
};

export const getAllAssignedPullRequests = () => {
  const graphql = buildAssignedPullRequestsGql("abeyuya");
  const option = buildRequestOption(graphql);
  const res = UrlFetchApp.fetch(endpoint, option as any);

  const json: IAssignedPullRequestsResponse = JSON.parse(res.getContentText());
  const result = pickAllAssignedPr(json);

  return result;
};

const targetOrgs = (json: IAssignedPullRequestsResponse) => {
  return json.data.user.organizations.nodes.filter((org) => {
    const urlInfo = org.url.split("/");
    const orgName = urlInfo[urlInfo.length - 1];
    return targetOrganizations.includes(orgName);
  });
};

const isAssignedPr = (username: string, pr: IPullRequest) => {
  const prToReviewRequestToMe = pr.reviewRequests.nodes.find((reviewRequest) => {
    const info = reviewRequest.requestedReviewer.url.split("/");
    const assigneeUsername = info[info.length - 1];
    return username === assigneeUsername;
  });

  return prToReviewRequestToMe ? true : false;
};

interface IAssignedPrRepo {
  repoName: string;
  repoUrl: string;
  assignedPrs: IPullRequest[];
}

const pickAssignedPr = (username: string, json: IAssignedPullRequestsResponse): IAssignedInfo[] => {
  const orgs = targetOrgs(json);
  const result: IAssignedInfo[] = [];

  orgs.forEach((org) => {
    const assignedPrRepos: IAssignedPrRepo[] = [];

    org.repositories.nodes.forEach((repo) => {
      const assignedPrs = repo.pullRequests.nodes.filter((pr) => {
        return isAssignedPr(username, pr);
      });

      if (assignedPrs.length === 0) { return; }

      assignedPrRepos.push({
        repoName: repo.name,
        repoUrl: repo.url,
        assignedPrs,
      });
    });

    if (assignedPrRepos.length === 0) { return null; }

    result.push({
      orgName: org.name,
      assignedPrRepos,
    });
  });

  return result;
};

export interface IAllUserAssignedPrRepo {
  username: string;
  assignedInfo: IAssignedInfo[];
}

const pickAllAssignedPr = (json: IAssignedPullRequestsResponse): IAllUserAssignedPrRepo[] => {
  const orgs = targetOrgs(json);

  let allUsers: string[] = [];
  orgs.forEach((org) => {
    org.repositories.nodes.forEach((repo) => {
      repo.pullRequests.nodes.forEach((pr) => {
        pr.reviewRequests.nodes.forEach((reviewRequest) => {
          const urlInfo = reviewRequest.requestedReviewer.url.split("/");
          const username = urlInfo[urlInfo.length - 1];
          allUsers.push(username);
        });
      });
    });
  });
  allUsers = uniqPickup(allUsers);

  if (allUsers.length === 0) { return []; }

  const result: IAllUserAssignedPrRepo[] = allUsers.map((username) => {
    return { username, assignedInfo: [] };
  });

  allUsers.forEach((username) => {
    const info = pickAssignedPr(username, json);
    if (info.length === 0) { return; }

    const userResult = result.find((r) => r.username === username);
    if (!userResult) { return; }

    userResult.assignedInfo = info;
  });

  return result;
};

/*
const getOpenedPullRequestsGql = `
{
  user(login: "abeyuya") {
    pullRequests(last:100 states:[OPEN]) {
      nodes {
        url
        title
      }
    }
  }
}
`;
*/

const buildAssignedPullRequestsGql = (username: string) => {

  return `
{
  user(login: "${username}") {
    organizations(last: 5) {
      nodes {
        name
        url
        repositories(last:100) {
          nodes {
            name
            url
            pullRequests(last:30 states:[OPEN] ) {
              nodes {
                url
                title
                reviewRequests(last:10) {
                  nodes {
                    requestedReviewer {
                      ... on User {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
};
