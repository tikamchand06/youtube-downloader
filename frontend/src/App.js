import React from "react";
import ConfettiJS from "confetti-js";
import logo from "./assets/icon.png";
import youtube from "./assets/youtube.gif";
import VideoInfo from "./components/VideoInfo";
import HomeIcon from "@rsuite/icons/legacy/Home";
import Twitter from "@rsuite/icons/legacy/Twitter";
import Linkedin from "@rsuite/icons/legacy/Linkedin";
import Facebook from "@rsuite/icons/legacy/Facebook";
import Instagram from "@rsuite/icons/legacy/Instagram";
import { FileDownload, Pc, Phone, Admin } from "@rsuite/icons";
import { Button, IconButton, ButtonToolbar, Container, Header, Content, Footer, Nav, Message, Form, Panel, Placeholder } from "rsuite";

// const PHP_URL = "http://localhost/tcm/social-downloader/api/getYTInfo"

export default function App() {
  const [state, setState] = React.useState({ ytUrl: "", errorMessage: "", isLoading: false, info: null });
  const { ytUrl, errorMessage, isLoading, info } = state;

  // Background Confetti generator
  React.useEffect(() => {
    const config = {
      max: 120,
      clock: 25,
      animate: false,
      target: "mycanvas",
      props: ["circle", "square", "triangle"],
      colors: [
        [165, 104, 246],
        [230, 61, 135],
        [0, 199, 228],
        [253, 214, 126],
      ],
    };
    const confetti = new ConfettiJS(config);
    confetti.render();

    return () => confetti.clear();
  }, []);

  const fetchVideoInfo = (url) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:5002/api/ytdl/getinfo?url=${url}`)
        .then((j) => j.json())
        .then(({ videoDetails, player_response }) => resolve({ videoDetails, player_response }))
        .catch(reject);
    });
  };

  const onSubmit = async () => {
    if (!ytUrl || !ytUrl.startsWith("http") || !ytUrl.includes("youtube.com"))
      setState({ ...state, errorMessage: "Please enter a valid YouTube URL" });
    else {
      try {
        setState({ ...state, isLoading: true });
        const { videoDetails, player_response } = await fetchVideoInfo(ytUrl);

        const {
          streamingData: { formats, adaptiveFormats },
        } = player_response;

        // Basic Info
        const { title, description, embed, thumbnails } = videoDetails;
        const thumbnail = thumbnails[thumbnails.length - 1].url;

        // Filter formats
        const audioonly = adaptiveFormats.filter((item) => item.mimeType.includes("audio"));
        const videoonly = adaptiveFormats.filter((item) => item.mimeType.includes("video"));
        const unqieFormats = videoonly.reduce((acc, item) => ({ ...acc, [item.quality]: item }), {});

        const info = {
          title,
          embed,
          thumbnail,
          url: ytUrl,
          description,
          medias: formats,
          videoonly: Object.values(unqieFormats),
          audioonly: audioonly.map((file) => ({ ...file, container: file.mimeType.split(";")[0] })),
        };

        setState({ ...state, isLoading: false, info });
      } catch (error) {
        console.log(error);
        setState({ ...state, isLoading: false });
      }
    }
  };

  console.log(info);

  return (
    <Container>
      <Header className='flex-item space-between p-2 shadow-1'>
        <div className='flex-item gap-1'>
          <img src={logo} alt='YouTube Video Downloader' height={42} />
          <h3 className='m-0' style={{ color: "#ff0000" }}>
            YT Downloader
          </h3>
        </div>
        <Nav>
          <Nav.Item active icon={<HomeIcon />}>
            Home
          </Nav.Item>
          <Nav.Item icon={<Pc />}>Company</Nav.Item>
          <Nav.Item icon={<FileDownload />}>Download Extension</Nav.Item>
          <Nav.Item icon={<Admin />}>About Us</Nav.Item>
          <Nav.Item icon={<Phone />}>Contact Us</Nav.Item>
        </Nav>
      </Header>

      <Content>
        <canvas id='mycanvas' style={{ position: "fixed", zIndex: -1 }}></canvas>
        <Panel className='download-content'>
          <div className='text-center mw-800px m-auto' style={{ padding: "2rem 0" }}>
            <img src={youtube} alt='youtube animated gif' height={220} />
            <Form fluid onSubmit={onSubmit} onChange={({ ytUrl }) => setState({ ...state, ytUrl, errorMessage: "" })}>
              <Form.Group controlId='ytUrl'>
                <Form.ControlLabel>Enter YouTube Video URL...</Form.ControlLabel>
                <Form.Control
                  autoFocus
                  size='lg'
                  type='url'
                  name='ytUrl'
                  value={ytUrl}
                  errorMessage={errorMessage}
                  placeholder='Enter YouTube Video URL...'
                />
                <Form.HelpText>
                  This website does not belong to and is not supported by YouTube in any manner. Downloading videos from YouTube is
                  strictly prohibited. Please use it at your own risk.
                </Form.HelpText>
              </Form.Group>
              <Form.Group>
                <Button appearance='primary' color='red' type='submit' size='lg' loading={isLoading} disabled={!ytUrl}>
                  <FileDownload /> <span>Download</span>
                </Button>
              </Form.Group>
            </Form>

            <Message type='info' className='mt-4 border-lightblue'>
              Looking for a video downloader for other social video platforms like Facebook, Twitter, Instagram or Vimeo? Try our{" "}
              <a href='https://www.socialdownloader.in' target='_blank' rel='noreferrer'>
                Social Video Downloader
              </a>
            </Message>
          </div>

          <VideoInfo info={info} />
        </Panel>

        <Panel className='m-2' header='How to "Download" YouTube videos. Just follow the simple steps...'>
          <Placeholder.Paragraph />
        </Panel>
      </Content>

      <Footer className='bg-dark text-white flex-item space-between p-2'>
        <span>&copy;{new Date().getFullYear()}. All Right Reserved</span>
        <span>
          Design and Developed by{" "}
          <a href='https://www.tcmhack.in' target='_blank' rel='noreferrer' className='text-white'>
            TCMHACK
          </a>
        </span>
        <ButtonToolbar>
          <IconButton icon={<Facebook />} color='blue' appearance='primary' circle />
          <IconButton icon={<Instagram />} color='red' appearance='primary' circle />
          <IconButton icon={<Twitter />} color='cyan' appearance='primary' circle />
          <IconButton icon={<Linkedin />} color='blue' appearance='primary' circle />
        </ButtonToolbar>
      </Footer>
    </Container>
  );
}
