import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getTagsByCategory } from '../../app/api/product';
import { addItem } from '../../app/features/Cart/actions';
import { fetchProducts, setPage, toggleTags } from '../../app/features/Product/actions';
import BreadCrumb from '../../components/BreadCrumb';
import CardProduct from '../../components/CardProduct'
import CardProductPlaceholder from '../../components/CardProductPlaceholder';
import Paginate from '../../components/Paginate';
import Tag from '../../components/Tag';

export default function Home() {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
    getTagsByCategory(products.category)
    .then(({data}) => setTags(data));
  }, [dispatch, products.currentPage, products.category, products.tags, products.keyword]);

  const breadcrumb = [
    {label: 'Home', path: '/'},
  ];

  return (
    <div>
      <Container className="mt-5 p-5">
        <BreadCrumb items={breadcrumb}/>
        <strong>Tags: </strong> <Tag items={tags} onClick={tag => dispatch(toggleTags(tag))}/>
        <Row xs={1} lg={4} md={2} className="g-4 mt-1 mb-5">
          { 
            products.status === 'process' ? 
              Array.from({length: 8}).map((_, idx) => (
                <Col key={idx}>
                  <CardProductPlaceholder />
                </Col>
              )) :  
              products.data.map((product, i) => {
                  return (
                    <Col key={i}>
                      <CardProduct item={product} onAddToCart={() => dispatch(addItem(product))}/>
                    </Col>
                  )
                })
            }
        </Row>
        <Paginate 
          total={Math.ceil(products.totalItems / products.perPage)} 
          active={products.currentPage}
          onSetPage={page => dispatch(setPage(page))}
          />
      </Container>
    </div>
  )
}
