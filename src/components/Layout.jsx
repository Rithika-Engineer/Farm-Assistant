export default function Layout({ children }) {

  const styles = {
    page:{
      minHeight:"100vh",
      width:"100%",
      background:"linear-gradient(#baf8c8,#eafff0)",
      padding:"30px"
    },

    container:{
      width:"100%",
      maxWidth:"1100px",
      margin:"auto",
      background:"white",
      borderRadius:"10px",
      padding:"30px",
      boxShadow:"0 5px 15px rgba(0,0,0,.15)"
    }
  };

  return(
    <div style={styles.page}>
      <div style={styles.container}>
        {children}
      </div>
    </div>
  );
}
