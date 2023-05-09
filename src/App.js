import { ChakraProvider, theme } from "@chakra-ui/react";
import RoutesPages from "./Routes/Routes";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RoutesPages />
    </ChakraProvider>
  );
}

export default App;
