import { Toaster } from "sonner";
import { LoginForm } from "../../components/auth/Login";
import { MenuProvider } from "../../components/context/MenuContext";
import Header from "../../components/Header";
import { useModeTheme } from "../../components/theme/toogleTheme";

const Login = () => {
  const { theme } = useModeTheme();
  return(
    <div className="flex flex-col h-screen">
      <MenuProvider>
        <Header />
        <div className="mt-16 sm:mt-0 pb-10 overflow-auto flex-grow sm:w-auto w-screen primary-theme">
          <LoginForm />
        </div>
        <Toaster
        visibleToasts={8}
        closeButton
        expand
        position="bottom-right"
        theme={theme}
      />
      </MenuProvider>
    </div>
)};

export default Login;
