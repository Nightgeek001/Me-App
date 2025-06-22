import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

// ✅ Get commit count from all repos for past 7 days
export const getCommitActivity = async (username: string): Promise<number> => {
  const { data: repos }: any = await axios.get(`${GITHUB_API}/users/${username}/repos`);
  
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  let totalCommits = 0;

  for (const repo of repos.slice(0, 5)) { // Limit to 5 repos to avoid rate limits
    try {
      const { data: commits }: any = await axios.get(
        `${GITHUB_API}/repos/${username}/${repo.name}/commits`,
        {
          params: { since: last7Days.toISOString() }
        }
      );
      totalCommits += commits.length;
    } catch (err) {
      // Skip repos that fail (e.g., permission denied or API rate-limited)
    }
  }

  return totalCommits;
};

// ✅ Get count of open pull requests authored by the user
export const getOpenPRs = async (username: string): Promise<number> => {
  const { data }: any = await axios.get(`${GITHUB_API}/search/issues`, {
    params: {
      q: `author:${username} is:open is:pr`,
    },
  });

  return data.total_count;
};
