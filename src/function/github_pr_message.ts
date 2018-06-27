
import "../lib/polyfill";
import { IAssignedInfo, IAllUserAssignedPrRepo } from "../lib/github";

export const buildGithubPrMessage = (assignedInfo: IAssignedInfo[]) => {
  const body = assignedInfo.map((info) => {
    return [
      `# ${info.orgName}`,
      info.assignedPrRepos.map((repo) => {
        return [
          `  - ${repo.repoName}`,
          repo.assignedPrs.map((pr) => {
            return [
              `    - ${pr.title}`,
              `      - ${pr.url}`,
            ].join("\n");
          }).join("\n"),
        ].join("\n");
      }).join("\n"),
    ].join("\n");
  }).join("\n");

  const message = [
    "```",
    body,
    "```",
  ].join("\n");

  return message;
};

export const buildGithubPrMessageForAllUser = (allUserAssignedInfo: IAllUserAssignedPrRepo[]): string | null => {

  const body = allUserAssignedInfo.map((allInfo) => {
    return [
      `# ${allInfo.username}`,
      allInfo.assignedInfo.map((info) => {
        return [
          `## ${info.orgName}`,
          info.assignedPrRepos.map((repo) => {
            return [
              `  - ${repo.repoName}`,
              repo.assignedPrs.map((pr) => {
                return [
                  `    - ${pr.title}`,
                  `      - ${pr.url}`,
                ].join("\n");
              }).join("\n"),
            ].join("\n");
          }).join("\n"),
        ].join("\n");
      }).join("\n"),
      "",
    ].join("\n");
  }).join("\n");

  const message = [
    "```",
    body,
    "```",
  ].join("\n");

  return message;
};
