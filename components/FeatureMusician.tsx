import { SimpleGrid, Box, Image } from '@chakra-ui/react'

export default function FeatureMusician() {
    const Item = () => {
        return (
            <Box
                as="section"
                className="card-item"
                // width={['400px', '200px', '100px', '150px']}
                // p={3}
                // minH={['150px', '170px', '200px', '100px']}
                // alignItems='center'
                // boxShadow='-2rem 0 3rem #000'
            >
                <Image
                    src="https://femalerockers.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fldn05m4o%2Fproduction%2Fd7dfe13e1beead0d17427dc68ecbdf41e8cb826e-1000x1500.jpg&w=384&q=75"
                    alt="avatar"
                    objectFit="cover"
                    borderRadius={[45, 55, 55, 80]}
                    // minH='90px'
                    // minW='90px'
                    // boxSize="170px"
                />
            </Box>
        )
    }
    return (
        <SimpleGrid
            className="card-list"
            display={['none', 'none', 'flex', 'flxe']}
            justifyContent="center"
            p={[2, 4, 1, 4]}
            columns={[12, 4, 6, 12]}
            spacing={2}
            width="100%"
            // overflow='scroll'
        >
            <Box as="section" className="card-item"></Box>
            {Array.from(Array(4).keys()).map((i) => (
                <Item key={i} />
            ))}

            <style global jsx>{`
                .card-item {
                    // min-width: 250px;
                    // height: 350px;
                    // border-radius: 16px;
                    width: 200px;
                    padding: 1.5rem;
                    background: #17141d;
                    box-shadow: -1rem 0 3rem #000;
                    display: flex;
                    flex-direction: column;
                    transition: 0.2s;
                    margin: 0;
                    scroll-snap-align: start;
                    clear: both;
                    position: relative;
                }

                .card-list::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                }
                .card-list::-webkit-scrollbar-thumb {
                    background: #201c29;
                    border-radius: 10px;
                    box-shadow: inset 2px 2px 2px hsla(0, 0%, 100%, 0.25),
                        inset -2px -2px 2px rgba(0, 0, 0, 0.25);
                }

                .card-list::-webkit-scrollbar-track {
                    background: linear-gradient(
                        90deg,
                        #201c29,
                        #201c29 1px,
                        #17141d 0,
                        #17141d
                    );
                }

                .card-item:focus-within ~ .card,
                .card-item:hover ~ .card-item {
                    transform: translateX(130px);
                }

                .card-item:hover {
                    transform: translateY(-1rem) rotate(-5deg);
                }

                .card-item:not(:first-child) {
                    margin-left: -65px;
                }
            `}</style>
        </SimpleGrid>
    )
}
