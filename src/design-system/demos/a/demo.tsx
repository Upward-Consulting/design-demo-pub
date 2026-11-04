// Demo A: "One motif". The blue quarter-arc of the Bellis "b" (a lagged 90-degree pipe elbow) runs the whole system.
import type { DemoModule } from '../../workbench/main';
import './demo.css';
import ContactPage from './contact';
import HomePage from './home';
import ProductsPage from './products';

const demo: DemoModule = {
  letter: 'a',
  name: 'One motif',
  pages: { home: HomePage, products: ProductsPage, contact: ContactPage },
};

export default demo;
