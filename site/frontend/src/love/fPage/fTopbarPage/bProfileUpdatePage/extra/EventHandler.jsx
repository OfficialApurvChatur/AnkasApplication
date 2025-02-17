const EventHandler = {
	Link: {
		Add: Redux => {
			return (
				Redux.dispatch({ type: Redux.action.FormObject, payload: {
					...Redux.state.FormObject,
					FormValue: {
						...Redux.state.FormObject.FormValue,
						links: [
							...Redux.state.FormObject.FormValue.links, {
							title: "",
							url: "",
						}]
					}
				} })                        
			)
		},
		Remove: (Redux, index) => {
			return (
				Redux.dispatch({ type: Redux.action.FormObject, payload: {
					...Redux.state.FormObject,
					FormValue: {
						...Redux.state.FormObject.FormValue,
						links: [
							...Redux.state.FormObject.FormValue.links.slice(0, index),
							...Redux.state.FormObject.FormValue.links.slice(index + 1)
						]
					}
				} })                        
			)
		},
		Change: (event, Redux, index) => {
			let {name, value} = event.target


			let links1 = Redux.state.FormObject.FormValue.links
			links1[index] = {
				...links1[index],
				[name]: value
			}

			return (
				Redux.dispatch({
					type: Redux.action.FormObject,
					payload: {
						...Redux.state.FormObject,
						FormValue: {
							...Redux.state.FormObject.FormValue,
							links: links1
						},
					},
				})
			)
		}
	},
	Address: {
		Change: (event, Redux) =>  Redux.dispatch({
			type: Redux.action.FormObject,
			payload: {
				...Redux.state.FormObject,
				FormValue: {
					...Redux.state.FormObject?.FormValue,
					address: {
						...Redux.state.FormObject?.FormValue?.address,
						[event.target.name]: event.target.value
					}
				},
			},
		})
	}
}

export default EventHandler