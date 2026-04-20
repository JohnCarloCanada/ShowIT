import GoogleButton from "../components/GoogleButton";

const Auth = () => {
  return (
    <section className="flex items-center justify-center flex-col gap-4 bg-white p-8 rounded-lg border-2 border-black px-6">
      <div>
        <h1 className="font-inter font-bold text-2xl sm:text-3xl text-[#1b1b1f] ">ShowIT</h1>
      </div>
      <div className="flex items-center justify-center flex-col gap-3">
        <p className="font-inter text-xl sm:text-2xl font-bold">Sign in to ShowIT</p>
        <GoogleButton />
      </div>
    </section>
  );
};
export default Auth;
