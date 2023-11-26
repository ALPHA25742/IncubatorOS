import { Box } from "@mui/material";
import Module from "./Module";

export default function Curriculum() {
  const curriculum = [
    {
      title: "a",
      vids: [
        {
          title: "x",
          link: "#",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, ducimus. Reprehenderit cumque asperiores magni veritatis, quis deleniti recusandae sit ad.",
        },
        {
          title: "y",
          link: "#",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, ducimus. Reprehenderit cumque asperiores magni veritatis, quis deleniti recusandae sit ad.",
        },
        {
          title: "z",
          link: "#",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, ducimus. Reprehenderit cumque asperiores magni veritatis, quis deleniti recusandae sit ad.",
        },
      ],
    },
    {
      title: "b",
      vids: [
        {
          title: "p",
          link: "#",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, ducimus. Reprehenderit cumque asperiores magni veritatis, quis deleniti recusandae sit ad.",
        },
        {
          title: "q",
          link: "#",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, ducimus. Reprehenderit cumque asperiores magni veritatis, quis deleniti recusandae sit ad.",
        },
        {
          title: "r",
          link: "#",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, ducimus. Reprehenderit cumque asperiores magni veritatis, quis deleniti recusandae sit ad.",
        },
      ],
    },
  ];
  return (
    <Box>
      <Box>
        {curriculum.map((module) => (
          <Module module={module} />
        ))}
      </Box>
    </Box>
  );
}
