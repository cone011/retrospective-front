import { ChakraProvider, theme } from "@chakra-ui/react";
import "./App.css";
import RoutesPages from "./Routes/Routes";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RoutesPages />
    </ChakraProvider>
  );
}

export default App;
