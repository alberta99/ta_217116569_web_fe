const [product, setProduct] = useState(null);
const [images, setImages] = useState(null);
const [currentIndex, setCurrentIndex] = useState(0);
const url = process.env.REACT_APP_API_URL;
const { id_barang } = useParams();

useEffect(() => {
  axios({
    method: "get",
    url: `${url}/barang/${id_barang}`,
  }).then((response) => {
    setProduct(response.data.data);
    setImages([
      `${response.data.data.gambar1_barang}`,
      `${response.data.data.gambar2_barang}`,
      `${response.data.data.gambar3_barang}`,
    ]);
  });
}, [id_barang]);

if (!product) {
  return <div>Loading...</div>;
}
