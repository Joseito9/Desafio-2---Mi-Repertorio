import fs from "fs";
import path from "path";

const getIndexHtml = (req, res) => {
  const filePath = path.resolve("index.html");
  res.sendFile(filePath);
};

const filePath = path.join("repertorio.json");

const getSongs = async (req, res) => {
  try {
    const songs = await fs.promises.readFile(filePath, "utf-8");
    res.status(200).json(JSON.parse(songs));
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while processing the request" });
  }
};

const addSong = async (req, res) => {
  const newSong = req.body;
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const songs = JSON.parse(data);

    newSong.id = songs.length > 0 ? songs[songs.length - 1].id + 1 : 1;
    songs.push(newSong);

    await fs.promises.writeFile(filePath, JSON.stringify(songs), "utf-8");
    res.status(201).json(newSong);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while processing the request" });
  }
};

const updateSong = (req, res) => {
  const { id } = req.params;
  const newSong = req.body;

  try {
    const songs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const index = songs.findIndex((song) => song.id == id);
    if (index === -1) {
      return res.status(404).json({ message: "Song not found" });
    }
    songs[index] = { ...songs[index], ...newSong };
    fs.writeFileSync(filePath, JSON.stringify(songs), "utf-8");
    res.status(200).json({ message: "Song successfully modified" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while modifying the song" });
  }
};

const deleteSong = (req, res) => {
  const { id } = req.params;
  try {
    const songs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const index = songs.findIndex((song) => song.id == id);
    if (index === -1) {
      return res.status(404).json({ message: "Song not found" });
    }
    songs.splice(index, 1);

    fs.writeFileSync(filePath, JSON.stringify(songs), "utf-8");

    res.status(200).json({ message: "Song successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the song" });
  }
};

const handleSong = (req, res) => {
  res.status(404).send("Page not found");
};

export { getIndexHtml, getSongs, addSong, updateSong, deleteSong, handleSong };
