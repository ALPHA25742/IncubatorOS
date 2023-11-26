import { Box, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

export default function Curriculum({ module }) {
  return (
    <>
      <Divider />
      <Typography variant="h5" component="h4" m="20px 50px">
        Module {module.title}
      </Typography>
      {module.vids.map((vid) => (
        <>
          <Divider />
          <Box
            display="flex"
            m="20px 50px"
            justifyContent="center"
            alignItems="center"
          >
            {/* <video src="" controls width="30%" height="150" /> */}
            <iframe
              width="30%"
              height="150"
              src="https://www.youtube.com/embed/LXb3EKWsInQ?si=fzY17ehnzBWlwPeG"
              // src={vid.link}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
              allowFullScreen
            ></iframe>
            <Box p="20px" flex={2}>
              <Typography variant="h5" m="0 0 5px">
                {vid.title}
              </Typography>
              <Typography>{vid.description}</Typography>
            </Box>
            <Box
              flex={1}
              gap={2}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Button variant="outlined" startIcon={<DoneIcon />}>
                I completed this
              </Button>
              <Button variant="outlined" startIcon={<ClearIcon />}>
                Skip-Not relevant
              </Button>
            </Box>
          </Box>
        </>
      ))}
    </>
  );
}
