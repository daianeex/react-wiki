import gitLogo from '../assets/github.png'
import { Container } from './styles';
import Button from '../components/Button';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { useState } from 'react';
import { api } from '../services/api';

function App() {

  const [repos, setRepos] = useState([]);

  const [currentRepo, setCurrentRepo] = useState('')
  const handleSearchRepo = async () => {

    const { data } = await api.get(`repos/${currentRepo}`)

    if (data.id) {

      const inExist = repos.find(repo => repo.id === data.id)

      if (!inExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }
    }
    alert('Repositório não encontrado')
  }

  const handleRemoveRepo = (id) => {
    const removeRepos = repos.filter((value) => value.id !== id);
      setRepos(removeRepos);
  }

  return (
    <Container>
            <img src={gitLogo} width={72} height={72} alt="github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;
