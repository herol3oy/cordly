import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Heading,
    Text,
} from "@chakra-ui/react";

export default function FaqAccordion() {
    return (
        <Box>
            <Heading textAlign={'center'} as="h1" size="2xl" mb={4} >
                FAQ
            </Heading>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                <Text fontSize='x-large'>
                                    Is Cordly free?
                                </Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Absolutely!
              </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                <Text fontSize='x-large'>
                                    I am an amateur musician. Can I be on Cordly?
                                </Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Of course. We encourage you to be on it, and it can lead your career into a professional path.
              </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                <Text fontSize='x-large'>
                                    How do I get a PRO badge?
                                </Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        PRO musicians are skilled and ready for recording sessions. If you think you got it, fill in THIS FORM and we’ll review your portfolio.
              </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                <Text fontSize='x-large'>
                                    Why should I be on Cordly instead of other link database services?
                                </Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Easy. First, Cordly is for musicians. Other services are general. Second, if you’re a pro, you get a badge and talent agencies dig that. Third, if you teach music, music learners can easily recognize you. Fourth, your whole musical career is seen in one page in a glance.             </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}
