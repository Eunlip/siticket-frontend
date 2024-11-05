const Loader = () => {
  return (
    <div className="flex fixed z-999999 overflow-hidden h-screen w-screen items-center justify-center bg-white dark:bg-boxdark">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-800 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
