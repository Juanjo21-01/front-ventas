import { Toaster } from "sonner";
import { RegisterForm } from "../../components/auth/Register";
import { MenuProvider } from "../../components/context/MenuContext";
import Header from "../../components/Header";
import { useModeTheme } from "../../components/theme/toogleTheme";

const Register = () => {
  const { theme } = useModeTheme();
  return (
    <div className="flex flex-col h-screen">
      <MenuProvider>
        <Header />
        <div className="mt-16 sm:mt-0 pb-10 overflow-auto flex-grow sm:w-auto w-screen primary-theme">
          <RegisterForm />
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

export default Register;
