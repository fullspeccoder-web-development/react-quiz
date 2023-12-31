export const determineEmoji = (percentage) => {
  if (percentage >= 100) return "🥇";
  if (percentage >= 80) return "🎉";
  if (percentage >= 50) return "🙃";
  if (percentage >= 0) return "🤨";
  if (percentage <= 0) return "🤦‍♂️";
};
