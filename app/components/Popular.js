let React = require('react');
let PropTypes = require('prop-types');

let api = require('../utils/api');

// stateless functional component
const SelectLanguage = (props) =>
{
    let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className="languages">
            {languages.map((language) => {
                return (
                    <li
                        key={language}
                        onClick={props.onSelect.bind(null, language)}
                        className={language === props.selectedLanguage ? 'active' : ''}
                    >{language}</li>
                );
            })}
        </ul>
    );
}

SelectLanguage.PropTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

// Repository grid (stateless functional component)
const RepoGrid = (props) =>
{
    return (
        <ul className="popular-list">
            {props.repos.map((repo, index) => {
                return (
                    <li
                        key={repo.name}
                        className='popular-item'
                    >
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="space-list-items">
                            <li>
                                <img
                                    className="avatar"
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                    />
                            </li>
                            <li>
                                <a href={repo.html_url}>{repo.name}</a>
                            </li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
}

RepoGrid.PropTypes = {
    repos: PropTypes.array.isRequired
};

// Popular twitter feeds component
class Popular extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
        selectedLanguage: 'All',
        repos: []
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() 
  {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(language)
  {
      this.setState(() => {
          return {
            selectedLanguage: language,
            repos: []
        }
      });

      api.fetchPopularRepos(language)
        .then((repos) => {
            this.setState({
                repos: repos
            });
        });
  }
  render()
  {
  	return (
        <div>
            <SelectLanguage 
                selectedLanguage={this.state.selectedLanguage}
                onSelect={this.updateLanguage} />
            { !this.state.repos 
                ? <p>LOADING</p>
                : <RepoGrid repos={this.state.repos} /> }
        </div>
    );
  }
}

module.exports = Popular;