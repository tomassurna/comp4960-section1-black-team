import React from 'react';
import ReactDOM from 'react-dom';

const myfirstelement = <h1>Hello React!</h1>
const myelement = (
	<table>
		<tr>
			<th>Name</th>
		</tr>
		<tr>
			<td>John</td>
		</tr>
		<tr>
			<td>Elsa</td>
		</tr>
	</table>
);

ReactDOM.render(myfirstelement, document.getElementById('root'));
ReactDOM.render(myelement, document.getElementById('root'));
