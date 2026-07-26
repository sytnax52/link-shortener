const { nanoid } = require("nanoid");
const Link = require("../models/Link");

const createLink = async (req, res) => {
  try {
    const { originalUrl, customCode } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "URL gerekli.",
      });
    }

   let shortCode;

if (customCode && customCode.trim() !== "") {
  const existingLink = await Link.findOne({
    shortCode: customCode,
  });

  if (existingLink) {
    return res.status(400).json({
      success: false,
      message: "This short URL is already in use.",
    });
  }

  shortCode = customCode;
} else {
  let exists = true;

  while (exists) {
    shortCode = nanoid(6);

    exists = await Link.findOne({
      shortCode,
    });
  }
}

const link = await Link.create({
  originalUrl,
  shortCode,
});

    res.status(201).json({
      success: true,
      data: link,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
    });
  }
};

const redirectLink = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const link = await Link.findOne({ shortCode });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link bulunamadı.",
      });
    }

    link.clicks += 1;
    await link.save();

    res.redirect(link.originalUrl);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
    });
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createLink,
  redirectLink,
  getLinks,
};