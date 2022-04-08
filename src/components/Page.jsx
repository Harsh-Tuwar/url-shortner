import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Heading,
	useColorModeValue,
	Button,
	InputGroup,
	InputLeftElement,
	InputRightAddon,
	CircularProgress,
	useToast,
} from '@chakra-ui/react';
import { FiLink } from "react-icons/fi";
import { AiOutlineCopy } from "react-icons/ai";
import { PRODUCT_NAME, API_URL } from '../constants/index';
import { useState } from 'react';
import axios from 'axios';

const SimpleCard = () => {
	const [longUrl, setLongUrl] = useState('');
	const [shortUrl, setShortUrl] = useState('asdasdsa');
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const getShortUrl = async () => {
		setLoading(true);
		if (longUrl === '') {
			toast({
				position: 'top',
				title: 'Hmmm....',
				description: "Could you please confirm if you have entered an URL to shorten?",
				status: 'error',
				duration: 9000,
				isClosable: true,
			});

			setLoading(false);
			return;
		}

		const response = await axios.post(API_URL, { lurl: longUrl }).catch((e) => {
			setLoading(false);
			toast({
				position: 'top',
				title: 'Wait on!',
				description: e.toString(),
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		});

		if (response.status !== 200) {
			toast({
				position: 'top',
				title: 'Hmmm....',
				description: "There's an issue creating a short URL for this one! Please try again later!",
				status: 'error',
				duration: 9000,
				isClosable: true,
			});

			setLoading(false);
			return;
		}

		const temp = Object.values(response.data)[0];
		if (temp.shortURL) {
			toast({
				position: 'top-right',
				title: 'Done',
				description: "Here's your short URL!",
				status: 'success',
				duration: 9000,
				isClosable: true,
			});

			setShortUrl(temp.shortURL);
		} else {
			toast({
				position: 'top-right',
				title: 'Something\' wrong!',
				description: "Something's wrong!",
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		}
		setLoading(false);
	}

	const copyToClipboard = () => {
		const shortUrlPlaceholder = document.querySelector('.short-url-placeholder');

		navigator.clipboard.writeText(shortUrlPlaceholder.value)

		toast({
			position: 'top-right',
			title: 'Done!',
			description: "Copied Successfully!",
			status: 'success',
			duration: 9000,
			isClosable: true,
		});
	}

	return (
		<Flex
			minH={'100vh'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={3}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>{PRODUCT_NAME}</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>
					<Stack spacing={4}>
						<FormLabel>Enter your long-url</FormLabel>
						<Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
							<InputGroup borderColor="#E0E1E7">
								<InputLeftElement
									pointerEvents="none"
									children={<FiLink color="gray.800" />}
								/>
								<Input
									type={'text'}
									placeholder={'https://abc.xyz'}
									color={useColorModeValue('gray.800', 'gray.200')}
									bg={useColorModeValue('gray.100', 'gray.600')}
									rounded={'full'}
									border={0}
									_focus={{
										bg: useColorModeValue('gray.200', 'gray.800'),
										outline: 'none',
									}}
									value={longUrl}
									onChange={(e) => setLongUrl(e.currentTarget.value)}
								/>
							</InputGroup>
							<Button
								bg={'blue.400'}
								rounded={'full'}
								color={'white'}
								flex={'1 0 auto'}
								_hover={{ bg: 'blue.500' }}
								_focus={{ bg: 'blue.500' }}
								onClick={getShortUrl}
								disabled={loading}
							>
								{loading ? <CircularProgress isIndeterminate size="25px" margin="auto" color='green.300' /> : <>Get Short Link</> }
							</Button>
						</Stack>
						<FormControl id="short-url">
							<FormLabel>Short URL</FormLabel>
							<InputGroup borderColor="#E0E1E7">
								<Input type="text" size="md" className='short-url-placeholder' disabled value={shortUrl}/>
								<InputRightAddon
									children={<AiOutlineCopy color="gray.800" />}
									onClick={copyToClipboard}
								/>
							</InputGroup>
						</FormControl>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
 
export default SimpleCard;
