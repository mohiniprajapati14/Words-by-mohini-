export default function RootLayout({ children }: any) {
  return (
    <html>
      <body style={{ margin: 0, background: "#0a0a0a", color: "white" }}>
        {children}
      </body>
    </html>
  );
}
