import "./App.css";
import "./lib/components/styles/index.scss";
import { Input, Pagination, CheckBox, Select } from "./lib";

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
        <CheckBox />
        <Select label="Label 1" supportive="supportive 1" />
      </header>
    </div>
  );
}

export default App;
