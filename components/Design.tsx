import {
    Box,
    Flex,
    Button,
    Link,
    SimpleGrid,
} from '@chakra-ui/react'
export default function Design({ bgColorSet }) {
    const variants = [
        'Default',
        'Black',
        'Blue',
        '#534B62',
        '#2F52E0',
        '#4F5D2F',
        '#5A7D7C',
        '#566246'
    ]
    return (
        <Flex justify='center' w='100%'>
            <SimpleGrid
                columns={3}
                spacing={3}
            >
                {variants.map((variant, idx) => (
                    <Button
                        key={idx}
                        borderRadius={10}
                        justify='center'
                        bg={variant === 'Default' ? '#1a202c' : variant}
                        h={52}
                        w={40}
                        variant='outline'
                        onClick={() => bgColorSet(variant === 'Default' ? '#1a202c' : variant)}
                    >
                        {variant}
                    </Button>
                ))}
            </SimpleGrid>
        </Flex>
    )
}
