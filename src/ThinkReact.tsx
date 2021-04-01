import React, { Component, ChangeEvent } from 'react';
import './ThinkReact';

function loadProducts(): Promise<Product[]> {
	return new Promise<Product[]>((resolve, reject) => {resolve([
	{name: 'Football', category: 'Sporting Goods', price: 49.99},
	{name: 'Baseball', category: 'Sporting Goods', price: 9.99},
	{name: 'Basketball', category: 'Sporting Goods', price: 29.99, outOfStock: true},
	{name: 'iPod Touch', category: 'Electronics', price: 99.99},
	{name: 'iPhone 5', category: 'Electronics', price: 399.99},
	{name: 'Nexus 7', category: 'Electronics', price: 199.99}
	
	]);});
}

interface Product {
	name: string;
	category?: string;
	price: number; 
	outOfStock?: boolean;
}

function ProductRow(props: Product) {
	return (
		<tr>
			<td>{props.name}</td>
			<td>${props.price}</td>
		</tr>);
}

function ProductCategoryRow(props: {name?: string}) {
	return (<tr><td colSpan={2}>{props.name}</td></tr>);
}

interface ProductTableProperties {
	includeOnlyInStock: boolean;
	filterBy: string;
}

class ProductTable extends Component<ProductTableProperties, {products: Product[]}> {
	
	constructor(props: ProductTableProperties) {
		super(props);
		this.state = {products: []};
	}
	
	componentDidMount() {
		loadProducts().then(p => this.setState({products: p}));
	}
	
	render() {
		const products = this.state.products.slice();
		const categories = products.map(p => p.category).filter((v, i, s) => s.indexOf(v) === i);
		
		const productTableRows = new Array<any>();
		for(const cat of categories) {
			productTableRows.push(<ProductCategoryRow key={cat} name={cat} />);
			for(const product of products.filter(p => p.category === cat)) {
				productTableRows.push(<ProductRow name={product.name} price={product.price} outOfStock={product.outOfStock} />);
			}
		}
		
		return (
		<table>
			<th>
				<td>Name</td>
				<td>Price</td>
			</th>
			{productTableRows}
		</table>);
	}
}

class SearchBar extends Component<{onSearchChanged: any, onOnlyInStockChanged: any}, {}> {
	render() {
		return (
		<div>
			<input placeholder="Search..." onChange={this.props.onSearchChanged}/>
			<br />
			<input id="inStock" type="checkbox" onChange={this.props.onOnlyInStockChanged}/>
			<label htmlFor="inStock">Only show products in stock</label>
		</div>);
	}
}

class FilterableProductTable extends Component<{}, {searchText: string, onlyInStock: boolean}> {
	
	constructor(props: {}) {
		super(props);
		this.state = {searchText: '', onlyInStock: false};
	}
	
	private searchChanged = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({searchText: e.target.value});
	}
	
	private stockCheckChanged = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({onlyInStock: "on" === e.target.value});
	}
	
	render() {
		const includeOnlyInStock = this.state.onlyInStock;
		const filterBy = this.state.searchText;
		return (
		<div>
			<SearchBar onSearchChanged={this.searchChanged} onOnlyInStockChanged={this.stockCheckChanged}/>
			<ProductTable includeOnlyInStock={includeOnlyInStock} filterBy={filterBy}/>		
		</div>);
	}
};

export default FilterableProductTable;