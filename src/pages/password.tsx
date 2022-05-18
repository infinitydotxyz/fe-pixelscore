import { SVG, TextInputBox } from 'components/common';
import { useSecurityContext } from 'utils/context/SecurityContext';

export const PasswordPage = () => {
  const { password, setPassword } = useSecurityContext();

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden grid place-content-center">
      <div className="flex flex-col gap-2 items-center">
        <div className="drop-shadow-2xl bg-white rounded-3xl flex flex-col items-center mx-0 my-4 p-8">
          <SVG.miniLogo className="h-16 w-16" />
          <div className="text-center mt-2 mb-6 text-xl font-bold">Password required</div>

          <TextInputBox
            label="Password"
            placeholder="Enter password"
            type="text"
            value={password}
            onChange={setPassword}
          />
        </div>
      </div>
    </div>
  );
};
