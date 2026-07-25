const { nanoid } = require("nanoid");
const Link = require("../models/Link");

const createLink = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "URL gerekli.",
      });
    }

    const shortCode = nanoid(6);

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

    // Tıklanma sayısını artır
    link.clicks += 1;
    await link.save();

    // Kullanıcıyı yönlendir
    res.redirect(link.originalUrl);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
    });
  }
};
module.exports = {
  createLink,
  redirectLink,
};