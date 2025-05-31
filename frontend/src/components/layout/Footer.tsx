const Footer = () => {
  return (
    <footer className="w-full bg-greenish-dark text-white py-8 mt-4">
      <div className="container mx-auto px-6 text-center text-md lg:text-xl">
        © Copyright {new Date().getFullYear()} EyeNimal
      </div>
    </footer>
  )
}

export default Footer 