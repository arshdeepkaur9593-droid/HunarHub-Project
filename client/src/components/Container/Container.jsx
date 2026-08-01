const Container = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
