const RepositoriesSummary = ({ repository }) => {
  return (
    <div className="flex flex-row gap-4 border-b p-2">
      <div>
        <div className="flex flex-row gap-4 items-center">
          <p>{repository.stargazers_count} stars</p>
          <p>{repository.forks_count} forks</p>
          <p>{repository.watchers} watching</p>
          {repository.language && (
            <div className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{
                  backgroundColor: getLanguageColor(repository.language),
                }}
              />
              <span>{repository.language}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getLanguageColor = (language) => {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    Ruby: "#701516",
    PHP: "#4F5D95",
    // Diğer diller için renkler eklenebilir
  };
  return colors[language] || "#808080";
};

export default RepositoriesSummary;
