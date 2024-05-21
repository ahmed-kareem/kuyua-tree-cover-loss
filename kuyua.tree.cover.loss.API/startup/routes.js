const treeCover = require("../routes/tree-cover-route");

module.exports = function(app, next)
{
    app.use("/api", treeCover);
}