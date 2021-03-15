import { Box, Text } from "@chakra-ui/react";
export default function EmojiAnimation() {
    return (
        <Box as={'section'}>
            <Text as={'h5'} fontSize='xl'>🥁</Text>
            <Text as={'h5'} fontSize='2xl'>🥁</Text>
            <Text as={'h5'} fontSize='3xl'>🥁</Text>
            <Text as={'h5'} fontSize='4xl'>🥁</Text>
            <Text as={'h5'} fontSize='6xl'>🥁</Text>
            <style global jsx>{`
            section {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: -999;
              }
              
              section h5 {
                position: absolute;
                display: block;
                list-style: none;
                width: 20px;
                height: 20px;
                animation: animate 25s linear infinite;
                bottom: -150px;
              }
              
              section h5:nth-child(1) {
                left: 25%;
                width: 80px;
                height: 80px;
                animation-delay: 0s;
              }
              
              section h5:nth-child(2) {
                left: 10%;
                width: 20px;
                height: 20px;
                animation-delay: 2s;
                animation-duration: 12s;
              }
              
              section h5:nth-child(3) {
                left: 70%;
                width: 20px;
                height: 20px;
                animation-delay: 4s;
              }
              
              section h5:nth-child(4) {
                left: 40%;
                width: 60px;
                height: 60px;
                animation-delay: 0s;
                animation-duration: 18s;
              }
              
              section h5:nth-child(5) {
                left: 65%;
                width: 20px;
                height: 20px;
                animation-delay: 0s;
              }
              
              section h5:nth-child(6) {
                left: 75%;
                width: 110px;
                height: 110px;
                animation-delay: 3s;
              }
              
              section h5:nth-child(7) {
                left: 35%;
                width: 150px;
                height: 150px;
                animation-delay: 7s;
              }
              
              section h5:nth-child(8) {
                left: 50%;
                width: 25px;
                height: 25px;
                animation-delay: 15s;
                animation-duration: 45s;
              }
              
              section h5:nth-child(9) {
                left: 20%;
                width: 15px;
                height: 15px;
                animation-delay: 2s;
                animation-duration: 35s;
              }
              
              section h5:nth-child(10) {
                left: 85%;
                width: 150px;
                height: 150px;
                animation-delay: 0s;
                animation-duration: 11s;
              }
              
              @keyframes animate {
                0% {
                  transform: translateY(0) rotate(0deg);
                  opacity: 1;
                  border-radius: 0;
                }
              
                100% {
                  transform: translateY(-1000px) rotate(720deg);
                  opacity: 0;
                  border-radius: 50%;
                }
              }
            `}</style>
        </Box>
    )
}
