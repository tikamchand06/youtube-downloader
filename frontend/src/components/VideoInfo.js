import React from "react";
import { Panel, Row, Col, Button } from "rsuite";

export default function VideoInfo({ info }) {
  if (!info) return null;

  const { title, url, embed, thumbnail, medias, description, videoonly, audioonly } = info;

  const getAudioBitrate = (bitrate) => `${Math.ceil(bitrate / 1024)}kbps`;

  const sendFileDownloadReq = (itag) => {
    window.open(`http://localhost:5002/api/ytdl/download?url=${url}&quality=${itag}`, "_blank");
  };

  const DownloadOptionList = ({ data, header, headerClass = "" }) => {
    return (
      <div className='options' style={{ flex: 1 }}>
        <strong className={"mb-1 d-block " + headerClass}>{header}</strong>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {data.map(({ itag, qualityLabel, url, container, bitrate }) => (
            <Button key={itag} appearance='default' color='red' onClick={() => sendFileDownloadReq(itag)}>
              <span>
                Download in {qualityLabel || getAudioBitrate(bitrate)} ({container || "mp4"})
              </span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Row id='video-info'>
      <Col md={12} sm={24}>
        <Panel header='Video Details' bordered shaded>
          {embed && embed?.iframeUrl ? (
            <iframe
              width='100%'
              title={title}
              allowFullScreen
              src={embed.iframeUrl}
              style={{ border: "none", borderRadius: 6, height: "45vh" }}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            ></iframe>
          ) : (
            <img src={thumbnail} alt={title} className='rounded' style={{ maxHeight: 300 }} />
          )}

          <a href={url} target='_blank' rel='noreferrer'>
            <h3>{title}</h3>
          </a>
          <pre className='m-0' style={{ whiteSpace: "pre-wrap", maxHeight: 320 }}>
            {description}
          </pre>
        </Panel>
      </Col>

      <Col md={12} sm={24}>
        <Panel header='Downloading Options' bordered shaded>
          <DownloadOptionList data={medias} header='With Audio & Video' />
          <DownloadOptionList data={videoonly} header='Video Only (without audio)' headerClass='mt-2' />
          <DownloadOptionList data={audioonly} header='Audio Only (Without video)' headerClass='mt-2' />
        </Panel>
      </Col>
    </Row>
  );
}
