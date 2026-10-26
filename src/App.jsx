import { useState } from "react";
import "./App.css";
import Cabecalho from "./Cabecalho";
import Botao from "./Botao";

function App() {
  const [erro, setErro] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");

  function adicionarTarefa() {
    if (texto.trim() === "") {
      setErro("O campo não pode ser vazio!");
      return;
    }
    setErro("");
    {
    }

    const novaTarefa = {
      id: Date.now(),
      texto: texto,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTexto("");
  }
  function apagarTarefa(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  function concluirTarefa(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    );
  }

  function apagarTudo() {
    setTarefas(tarefas.splice(1, tarefas));
  }

  return (
    <div className="App">
      <Cabecalho titulo="Todo List" />
      <input
        type="text"
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
        placeholder="Digite uma tarefa..."
      />
      {erro && <p className="erro">{erro}</p>}
      <button onClick={adicionarTarefa}>Adicionar</button>
      <button onClick={apagarTudo}> Apagar tudo</button>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <button
              className="buttonApagar"
              onClick={() => apagarTarefa(tarefa.id)}
            >
              X
            </button>

            <input
              className="check"
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() => concluirTarefa(tarefa.id)}
            />
            <span
              style={{
                textDecoration: tarefa.concluida ? "line-through" : "none",
              }}
            >
              {tarefa.texto}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
