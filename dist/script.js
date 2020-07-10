class Game extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "game" },
      React.createElement("div", { className: "jogo-tabuleiro" },
      React.createElement(Tabuleiro, {
        quadrados: Array(9).
        fill().
        map((value, pos) => pos) })),


      React.createElement("div", { className: "game-info" })));



  }}


class Tabuleiro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      xIsNext: true };

  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "titulo" }, "Jogo da Velha"),
      React.createElement("div", { className: "linha" },
      this.renderizarQuadrado(0),
      this.renderizarQuadrado(1),
      this.renderizarQuadrado(2),
      React.createElement("button", { className: "button reiniciar", onClick: () => this.reiniciar() }, "Reiniciar Partida")),

      React.createElement("div", { className: "linha" },
      this.renderizarQuadrado(3),
      this.renderizarQuadrado(4),
      this.renderizarQuadrado(5)),

      React.createElement("div", { className: "linha" },
      this.renderizarQuadrado(6),
      this.renderizarQuadrado(7),
      this.renderizarQuadrado(8),
      React.createElement("button", { className: "button randomico", onClick: () => this.random() }, "Jogada Rand\xF4mica"))));



  }

  random() {
    const quadrados = this.state.quadrados.slice();
    let vencedor = calcWinner(quadrados);
    if (vencedor) {
      alert(vencedor + " ganhou!");
      return;
    }

    if (!this.estaVazio())
    return;

    do {
      var quadrado = Math.floor(Math.random() * 9);
    } while (quadrados[quadrado] != null);

    quadrados[quadrado] = this.state.xIsNext ? "X" : "O";
    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }
  estaVazio() {
    const quadrados = this.state.quadrados.slice();
    for (let i = 0; i < quadrados.length; i++)
    if (quadrados[i] == null) return true;
    return false;
  }
  reiniciar() {
    const quadrados = this.state.quadrados.slice();
    for (let i = 0; i < quadrados.length; i++) {
      quadrados[i] = null;
    }
    this.setState({ quadrados: quadrados });
  }
  renderizarQuadrado(i) {
    return (
      React.createElement(Quadrado, {
        value: this.state.quadrados[i],
        onClick: () => this.handleClick(i) }));


  }
  handleClick(i) {
    const quadrados = this.state.quadrados.slice();
    let vencedor = calcWinner(quadrados);
    if (vencedor) {
      alert(vencedor + " ganhou!");
      return;
    }
    if (quadrados[i]) {
      alert("Posição ocupado!");
      return;
    }
    quadrados[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }}


function calcPossibleWinner(squares, valor) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === valor && squares[a] === squares[b] && squares[c] === null)
    return c;
    if (squares[a] === valor && squares[a] === squares[c] && squares[b] === null)
    return b;
    if (squares[b] === valor && squares[b] === squares[c] && squares[a] === null)
    return a;
  }
  return null;
}

function calcWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    return squares[a];
  }
  return null;
}


class Quadrado extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("button", { className: "quadrado", onClick: () => this.props.onClick() },
      this.props.value));


  }}


ReactDOM.render(React.createElement(Game, null), document.getElementById("root"));