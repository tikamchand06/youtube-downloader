const ytdl = require("ytdl-core");
const express = require("express");

const router = express.Router();

// @route   GET api/ytdl/getinfo
// @desc    Fetch youtube video info
// @access  Public
router.get("/getinfo", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url || !ytdl.validateURL(url)) return res.status(400).json({ msg: "Please enter the valid video URL" });

    let info = await ytdl.getBasicInfo(url);

    res.json(info);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   GET api/ytdl/download
// @desc    Download youtube video info
// @access  Public
router.get("/download", async (req, res) => {
  try {
    const { url, quality = "18" } = req.query;
    if (!url || !ytdl.validateURL(url)) return res.status(400).json({ msg: "Please enter the valid video URL" });

    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality });
    res.header("Content-Disposition", `attachment; filename="${info.videoDetails.title}.${format.container}"`);
    ytdl(url, { format }).pipe(res);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
