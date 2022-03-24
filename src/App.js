import logo from "./logo.svg";
import "./App.css";
import "./lib/components/styles/index.scss";
import { Input, Pagination } from "./lib";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Input
          label="label 1"
          placeholder="text input"
          supportiveText="supportive 1"
          leadingText="123"
          trailingIcon="search"
          inputType="password"
        />
        <Pagination totalPage={10} />
      </header>
    </div>
  );
}

export default App;
