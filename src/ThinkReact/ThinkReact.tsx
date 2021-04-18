import React, { Component, ChangeEvent, Fragment } from 'react';
import './ThinkReact.css';

// Define what a product looks like, which we will also use as props for our product rows
interface Product {
	name: string;
	category?: string;
	price: number; 
	outOfStock?: boolean;
}

// Fake async Http like function, so we can pretend we're a real application for a bit
function loadProducts(): Promise<Product[]> {
	return new Promise<Product[]>((resolve, reject) => {
		resolve([
			{name: 'Football', category: 'Sporting Goods', price: 49.99},
			{name: 'Baseball', category: 'Sporting Goods', price: 9.99},
			{name: 'Basketball', category: 'Sporting Goods', price: 29.99, outOfStock: true},
			{name: 'iPod Touch', category: 'Electronics', price: 99.99},
			{name: 'iPhone 5', category: 'Electronics', price: 399.99, outOfStock: true},
			{name: 'Nexus 7', category: 'Electronics', price: 199.99}	
			]);
		});
}

// Show off a single product
function ProductRow(props: Product) {
	return (
		<tr className={props.outOfStock ? "outOfStock" : undefined}>
			<td>{props.name}</td>
			<td>${props.price}</td>
		</tr>);
}

// Show off a product category
function ProductCategoryRow(props: {name?: string}) {
	return (<tr className="category"><td colSpan={2}>{props.name}</td></tr>);
}

interface ProductTableProperties {
	includeOnlyInStock: boolean;
	filterBy: string;
}

// Define the table as a whole, which also fetches up the products themselves
// We store the actual products in the state, though they're loaded once when the component is mounted
class ProductTable extends Component<ProductTableProperties, {products: Product[]}> {
	
	constructor(props: ProductTableProperties) {
		super(props);
		this.state = {products: []};
	}
	
	componentDidMount() {
		// Fetching up the products and apply them to the state with a callback
		loadProducts().then(p => this.setState({products: p}));
	}
	
	render() {
		// Never alter the original product list
		const products = this.state.products.slice();
		// Collect the categories
		const categories = products.map(p => p.category).filter((v, i, s) => s.indexOf(v) === i);
		
		const filterLower = this.props.filterBy.toLowerCase();
		
		// Create our table rows by capturing each category and then use the filter to collect the 
		// products that match.
		const productTableRows = new Array<any>();
		for(const cat of categories) {
			productTableRows.push(<ProductCategoryRow key={cat} name={cat} />);
			for(const product of products
									.filter(p => p.category === cat)
									.filter(p => p.name.toLowerCase().indexOf(filterLower) > -1)) {
				if(!this.props.includeOnlyInStock || !product.outOfStock) {
					productTableRows
						.push(<ProductRow 
								key={product.name} 
								name={product.name} 
								price={product.price} 
								outOfStock={product.outOfStock} 
							/>);
				}
			}
		}
		
		return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{productTableRows}
			</tbody>
		</table>);
	}
}

// Our filtering search bar, with the in stock check box as well
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

// And finally our top level component with lifted state for the filters
class FilterableProductTable extends Component<{}, {searchText: string, onlyInStock: boolean}> {
	
	constructor(props: {}) {
		super(props);
		this.state = {searchText: '', onlyInStock: false};
	}
	
	// Lifted state handler for the filter text
	private searchChanged = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({searchText: e.target.value});
	}
	
	// Lifted state handler for the in stock check
	private stockCheckChanged = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState((s) => {return {onlyInStock: !s.onlyInStock};});
	}
	
	render() {
		const includeOnlyInStock = this.state.onlyInStock;
		const filterBy = this.state.searchText;
		return (
		<Fragment>
			<SearchBar onSearchChanged={this.searchChanged} onOnlyInStockChanged={this.stockCheckChanged}/>
			<ProductTable includeOnlyInStock={includeOnlyInStock} filterBy={filterBy}/>		
		</Fragment>);
	}
};

export default FilterableProductTable;