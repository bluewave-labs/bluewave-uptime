const PORT = process.env.PORT || 5000;

const connectDbAndRunServer = async (app, db) => {
  try {
    await db.connect();
    app.listen(PORT, () => {
      console.log(`server started on port:${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to DB");
    console.error(error);
  }
};

module.exports = { connectDbAndRunServer };
