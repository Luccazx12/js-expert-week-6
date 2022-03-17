import memeMaker from "@erickwendel/meme-maker";

const options = {
  image: "./img/batman-meme.jpg",
  outfile: "./img/batman-meme-output.png",
  topText: "MARSHAL DESCONTANDO OS TAPAS",
  bottomText: "NO TIO BARNEY",
};

memeMaker(options)
  .then((_) => {
    console.log("Image saved: " + options.outfile);
  })
  .catch((error) => console.log(error));
