import { useState, useEffect } from 'react';
import {
	Container, SimpleGrid, Box, Heading, Textarea, Text, Input, Button,
	Table, Tbody, Tr, Th, Td, TableContainer, Image, HStack,
} from '@chakra-ui/react';
import { codeToString, newKey, encryptVigenere, decryptVigenere } from '../../utils/vigenere';
import { encryptRoute, decryptRoute } from '../../utils/route';

const Home = () => {
	// initialization state
	const [isClicked, setIsClicked] = useState(false);
	const [message, setMessage] = useState('');
	const [keyVigenere, setKeyVigenere] = useState('');
	const [keyRoute, setKeyRoute] = useState('');

	// without live update
	useEffect(() => {
		if (isClicked) {
			setIsClicked(false);
		}
	}, [message, keyVigenere, keyRoute]);

	// function for handle key vigenere
	const handleKeyVigenere = () => {
		return newKey(message, keyVigenere);
	}

	// function for handle encrypt
	const handleEncrypt = () => {
		// encrypt vigenere
		const doEncryptVigenere = encryptVigenere(message, handleKeyVigenere);
		const resultVigenere = codeToString(doEncryptVigenere).join('');

		// encrypt route
		const newKeyRoute = keyRoute.match(/^[2-9]+$/) ? keyRoute : 2;
		const doEncryptRoute = encryptRoute(resultVigenere, newKeyRoute);

		return { 
			encryptCodeVigenere: doEncryptVigenere,
			encryptVigenere: resultVigenere,
			encryptRoute: doEncryptRoute
		}
	}
	
	// function for handle decrypt
	const handleDecrypt = () => {
		const decrypt = decryptVigenere(handleEncrypt().encryptCodeVigenere, handleKeyVigenere);
		
		const newKeyRoute = keyRoute.match(/^[2-9]+$/) ? keyRoute : 2;
		const doDecryptRoute = decryptRoute(handleEncrypt().encryptRoute, newKeyRoute);
		console.info(doDecryptRoute);
		
		return { 
			decryptVigenere: codeToString(decrypt).join(''),
			decryptRoute: doDecryptRoute
		}
	}

	return (
		<Container maxW='1440px' p='5' color='gray.800'>
			<Box p='10' bg='blue.50' mx='auto' mb='10' border='1px' borderColor='gray.200'>
				<Heading mb='6'>Implementasi Super Enkripsi</Heading>
				<Text maxW='3xl' color='gray.600'>
					Ini merupakan tugas untuk matakuliah Kriptografi dengan mengimplementasikan <b>super enkripsi</b>. Pada program ini dibuat dengan menggunakan algoritma <b>Vigenere Cipher</b> dan <b>Route Cipher</b>.
				</Text>

				<Box bg='blue.50' pt='8' mt='10' mx='auto' borderTop='1px' borderColor='gray.300'>
					<Box mb='6'>
						<Text mb='8px'>Masukan Pesan:</Text>
						<Textarea
							bg='white'
							size='lg'
							value={message}
							onChange={e => setMessage(e.target.value)}
						/>
					</Box>
					<Box mb='6'>
						<Text mb='8px'>Masukan Kunci Vigenere:</Text>
						<Input
							bg='white'
							size='lg'
							value={keyVigenere}
							onChange={e => setKeyVigenere(e.target.value)}
						/>
					</Box>
					<Box mb='6'>
						<Text mb='8px'>Masukan Kunci Route:</Text>
						<Input
							bg='white'
							size='lg'
							value={keyRoute}
							onChange={e => setKeyRoute(e.target.value)}
						/>
					</Box>
					
					{
						message !== '' && keyVigenere != '' && keyRoute.match(/^[2-9]+$/) ? (
							<Button colorScheme='teal' size='lg' width='100%' onClick={() => setIsClicked(true)}>Enkripsi</Button>
						) : (
							<Button colorScheme='teal' size='lg' width='100%' isDisabled>Enkripsi</Button>
						)
					}
				</Box>
			</Box>
			
			{ isClicked ? (
				<Box p='10' bg='blue.50' mx='auto' border='1px' borderColor='gray.200'>
					<Box mb='10'>
						<Heading mb='6'>Enkripsi 1: Algoritma Vigenere Cipher</Heading>
						<TableContainer border='1px' borderColor='gray.300'>
							<Table variant='simple'>
								<Tbody>
									<Tr>
										<Th borderColor='gray.300' width='800px'>Pesan yang di enkripsi</Th>
										<Td borderColor='gray.300'>{message}</Td>
									</Tr>
									<Tr>
										<Th borderColor='gray.300'>Kata Kunci</Th>
										<Td borderColor='gray.300'>{keyVigenere}</Td>
									</Tr>
									<Tr>
										<Th borderColor='gray.300'>Kunci</Th>
										<Td borderColor='gray.300'>{handleKeyVigenere()}</Td>
									</Tr>
									<Tr>
										<Th borderColor='gray.300'>Enkripsi</Th>
										<Td borderColor='gray.300'>{handleEncrypt().encryptVigenere}</Td>
									</Tr>
									<Tr>
										<Th>Hasil dekripsi</Th>
										<Td>{handleDecrypt().decryptVigenere}</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>
					</Box>
					
					<Box>
						<Heading mb='6'>Enkripsi 2: Algoritma Caesar Cipher</Heading>
						<TableContainer border='1px' borderColor='gray.300'>
							<Table variant='simple'>
								<Tbody>
									<Tr>
										<Th borderColor='gray.300' width='800px'>Pesan yang di enkripsi</Th>
										<Td borderColor='gray.300'>{handleEncrypt().encryptVigenere}</Td>
									</Tr>
									<Tr>
										<Th borderColor='gray.300'>Kunci</Th>
										<Td borderColor='gray.300'>{keyRoute}</Td>
									</Tr>
									<Tr>
										<Th borderColor='gray.300'>Enkripsi</Th>
										<Td borderColor='gray.300'>{handleEncrypt().encryptRoute}</Td>
									</Tr>
									<Tr>
										<Th>Hasil dekripsi 1</Th>
										<Td>{handleDecrypt().decryptRoute}</Td>
									</Tr>
									<Tr>
										<Th>Hasil dekripsi 2</Th>
										<Td>{handleDecrypt().decryptVigenere}</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>
					</Box>
				</Box>
			) : null }

			<Box p='10' bg='blue.50' mx='auto' mt='10' border='1px' borderColor='gray.200'>
				<SimpleGrid columns={2} spacing={10}>
					<Box>
						<Heading mb='6'>Profil Mahasiswa</Heading>
						
						<HStack spacing='24px' mb="4">
							<Box w='150px'>
								<Image
									borderRadius='full'
									boxSize='150px'
									src='https://avatars.githubusercontent.com/u/60835073?v=4'
									alt='Moch Fikri Khoirurrizal'
								/>
							</Box>
							<Box>
								<TableContainer border='1px' borderColor='gray.300'>
									<Table variant='unstyled'>
										<Tbody>
											<Tr>
												<Th width="100px">Nama</Th>
												<Td w="10">:</Td>
												<Td>Moch Fikri Khoirurrizal</Td>
											</Tr>
											<Tr>
												<Th>NPM</Th>
												<Td>:</Td>
												<Td>432007006190122</Td>
											</Tr>
											<Tr>
												<Th>Kelas</Th>
												<Td>:</Td>
												<Td>T3 - B</Td>
											</Tr>
										</Tbody>
									</Table>
								</TableContainer>
							</Box>
						</HStack>

						<a href='https://github.com/fikriwado' target="_blank">
							<Button	Button colorScheme='black' size='md' variant='outline' mr="2">Github</Button>
						</a>
						
						<a href='https://www.linkedin.com/in/fikriwado' target="_blank">
							<Button	Button colorScheme='blue' size='md' variant='outline'>LinkedIn</Button>
						</a>
					</Box>
					<Box>
						<Heading mb='6'>Rincian Project</Heading>
						<TableContainer border='1px' borderColor='gray.300'>
							<Table variant='unstyled'>
								<Tbody>
									<Tr>
										<Th width="200px">Algoritma</Th>
										<Td w="10">:</Td>
										<Td>Vigenere Chiper & Route Chiper</Td>
									</Tr>
									<Tr>
										<Th>Bahasa Pemrograman</Th>
										<Td>:</Td>
										<Td>Javascript</Td>
									</Tr>
									<Tr>
										<Th>Framework</Th>
										<Td>:</Td>
										<Td>ReactJs</Td>
									</Tr>
									<Tr>
										<Th>Library</Th>
										<Td>:</Td>
										<Td>Chakra UI</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>
					</Box>
				</SimpleGrid>
			</Box>
		</Container>
	);
}

export default Home;
