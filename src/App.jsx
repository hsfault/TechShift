import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import useLenis from './hooks/useLenis'
import CartProvider from './context/CartProvider'
import SiteBackdrop from './components/SiteBackdrop'
import SaleBar from './components/SaleBar'
import GlassNav from './components/GlassNav'
import CartDrawer from './components/CartDrawer'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Deals from './pages/Deals'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const page = (label, el) => <PageTransition label={label}>{el}</PageTransition>

export default function App() {
  const location = useLocation()
  useLenis()

  return (
    <CartProvider>
      <SiteBackdrop />
      <SaleBar />
      <GlassNav />
      <CartDrawer />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={page('The TechShift', <Home />)} />
          <Route path="/shop" element={page('The Shop', <Shop />)} />
          <Route path="/deals" element={page('Deals', <Deals />)} />
          <Route path="/product/:id" element={page('Product', <Product />)} />
          <Route path="/checkout" element={page('Checkout', <Checkout />)} />
          <Route path="/contact" element={page('Contact', <Contact />)} />
          <Route path="/collection" element={<Navigate to="/shop" replace />} />
          <Route path="*" element={page('Not found', <NotFound />)} />
        </Routes>
      </AnimatePresence>
    </CartProvider>
  )
}