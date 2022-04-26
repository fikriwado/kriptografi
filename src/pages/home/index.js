import { useState } from 'react';
import {
	Container, Box, Heading, Textarea, Text, Input, Button,
	Table, Tbody, Tr, Th, Td, TableContainer,
} from '@chakra-ui/react';

const Home = () => {
	// initialization state
	const [isClicked, setIsClicked] = useState(false);
	const [message, setMessage] = useState('hafit syukri dan hican');
	const [keyVigenere, setKeyVigenere] = useState('kpukp kpukpu puk ukpuk');
	const [keyCaesar, setKeyCaesar] = useState('');

	// initialization alphabet
	const alphabet = [
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
		'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
		's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	];

	// function for get code from alphabet
	function getKeyByValue(value) {
		return parseInt(Object.keys(alphabet).find(key => alphabet[key] === value));
	}

	// function for convert code to alphabet
	function codeToString(code) {
		const result = code.map((kode) => {
			return alphabet[kode] ?? ' ';
		});
		return result;
	}

	const newKey = () => {
		if (keyVigenere.length > message.length) {
			return keyVigenere.split('').slice(0, message.length).join('');
		} else {
			return keyVigenere + alphabet.slice(0, message.length - keyVigenere.length).join('');
		}
	}
	
	// function for encrypt vigenere
	function encryptVigenere(message) {
		const codeKey = newKey().split('').map(letter => getKeyByValue(letter));
		console.info(codeKey);
		const codeAlphabet = message.split('').map(letter => {
			return getKeyByValue(letter);
		});

		const encrypt = codeAlphabet.map((code, index) => {
			return (((parseInt(code) + parseInt(codeKey[index])) % 26) + 26) % 26;
		});

		return encrypt;
	}

	// function for decrypt vigenere
	function decryptVigenere(encrypt) {
		const codeKey = newKey().split('').map(letter => getKeyByValue(letter));
		
		const decrypt = encrypt.map((code, index) => {
			return (((parseInt(code) - parseInt(codeKey[index])) % 26) + 26) % 26;
		});

		return decrypt;
	}

	const handleEncryptVigenere = () => {
		const encrypt = encryptVigenere(message);		
		return {
			encrypt, result: codeToString(encrypt).join('')
		}
	}
	
	const handleDecryptVigenere = () => {
		const decrypt = decryptVigenere(handleEncryptVigenere().encrypt);		
		return codeToString(decrypt).join('');
	}

	return (
		<Container maxW='1440px' p='5' color='gray.800'>
			<Box p='10' bg='blue.50' mx='auto' mb='10' border='1px' borderColor='gray.200'>
				<Heading mb='6'>Implementasi Super Enkripsi</Heading>
				<Text maxW='3xl' color='gray.500'>
					Ini merupakan tugas untuk matakuliah Kriptografi dengan mengimplementasikan super enkripsi. Pada program ini dibuat dengan menggunakan algoritma Vigenere Cipher dan Caesar Cipher.
				</Text>

				<Box bg='blue.50' pt='8' mt='10' mx='auto' borderTop='1px' borderColor='gray.300'>
					<Box mb='6'>
						<Text mb='8px'>Masukan pesan:</Text>
						<Textarea
							bg='white'
							size='lg'
							value={message}
							onChange={e => setMessage(e.target.value)}
						/>
					</Box>
					<Box mb='6'>
						<Text mb='8px'>Masukan kunci vigenere:</Text>
						<Input
							bg='white'
							size='lg'
							value={keyVigenere}
							onChange={e => setKeyVigenere(e.target.value)}
						/>
					</Box>
					<Box mb='6'>
						<Text mb='8px'>Masukan kunci caesar:</Text>
						<Input
							bg='white'
							size='lg'
							value={keyCaesar}
							onChange={e => setKeyCaesar(e.target.value)}
						/>
					</Box>

					<Button colorScheme='teal' size='lg' width='100%' onClick={() => setIsClicked(true)}>Enkripsi</Button>
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
										<Td borderColor='gray.300'>{newKey()}</Td>
									</Tr>
									<Tr>
										<Th borderColor='gray.300'>Enkripsi</Th>
										<Td borderColor='gray.300'>{handleEncryptVigenere().result}</Td>
									</Tr>
									<Tr>
										<Th>Hasil dekripsi</Th>
										<Td>{handleDecryptVigenere()}</Td>
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
										<Td borderColor='gray.300'>inches</Td>
									</Tr>
									<Tr>
										<Th borderColor='gray.300'>Sisipan caesar</Th>
										<Td borderColor='gray.300'>inches</Td>
									</Tr>
									<Tr>
										<Th borderColor='gray.300'>Enkripsi</Th>
										<Td borderColor='gray.300'>inches</Td>
									</Tr>
									<Tr>
										<Th>Hasil dekripsi</Th>
										<Td>inches</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>
					</Box>
				</Box>
			) : null }
		</Container>
	);
}

export default Home;
