import { Head, Foot } from '../../layouts';
import './style.scss';

const NoMatch = () => (
  <div className="noDataWrap">
    <Head />
    <div className="notFind center">
      <h1>Sorry,你访问的页面丢了...</h1>
    </div>
    <Foot />
  </div>
);

export default NoMatch;
