({
	select2: function(component, event, helper){
        var action = component.get('v.action');
        var items = component.get('v.items');
        if(action){
			helper.actionSelect(component, event, helper);
		}
		else{
			helper.itemsSelect(component, event, helper);
		}
		
		
	},
	itemsSelect : function(component, event, helper){
        var placeholder = component.get('v.placeholder');
		var items = component.get('v.items');
		var select = component.find('pc-select-input');
		var sel = $(select.getElement());
        var opts = this.getOptions(component, items);
		if(sel.data('select2')) sel.select2('destroy');
		sel.select2({
			data: opts,
			placeholder: placeholder,
			theme: 'bootstrap',
			minimumResultsForSearch: 10,
			width: '100%'
		});
		helper.addEventHandler(component, sel);
	},
	actionSelect: function(component, event, helper){
		var placeholder = component.get('v.placeholder');
		var action = component.get('v.action');
        console.log('action select');
        console.log(action);
        var info = component.get('v.info'); 
		var select = component.find('pc-select-input');
		var sel = $(select.getElement());

		if(sel.data('select2')) sel.select2('destroy');
		action.setCallback(this, function(response){
			var search = response.getReturnValue();
			sel.select2({
				ajax: {
					transport: $A.getCallback(function(params, success, failure){
						search.setParam('name', params.data.q);
						search.setCallback(component, function(results){
							if(results !== null && results.getState() == 'SUCCESS'){
								success(results.getReturnValue());
							}
							else{
								failure(results.getReturnValue());
							}
						})
			            $A.enqueueAction(search);
					}),
					processResults: function (data) {
                        var options = helper.getOptions(component, data);
						return {
							results: options
						};
					},
					delay: 250
				},
				minimumInputLength: 2,
				placeholder: placeholder,
				theme: 'bootstrap',
				width: '100%',
				templateResult : function(option){
					if(!info || !option.data || !option.data[info]) { return option.text }
					var $option = $(
						'<span><span class="text-muted small">'+option.data[info]+'</span> '+ option.text   +'</span>'
					);
					return $option;
				}
			});
			helper.addEventHandler(component, sel);
			
		});
		$A.enqueueAction(action);
	},
	addEventHandler : function(component, sel){
		var clear = component.get('v.clear');
		var helper = this;
        sel.on('select2:select', $A.getCallback(function(evt){
			if(component.isValid()) {
                   	helper.change(component, evt.params.data);
					if(clear)sel.val(null).trigger("change");
				}
				
			})
		);
        
	},
	getOptions : function(component, items){
		var id = component.get('v.id');
		var label = component.get('v.label');
		var group = component.get('v.group');
		var options = [];
        _.each(items, function(item){
			var opt =  {id: item[id], text: item[label], data: item}
			if(group){
				var optGroup = _.findWhere(options, {text: item[group]});
				if(optGroup){
					optGroup.children.push(opt);
					optGroup.children = _.sortBy(optGroup.children, 'text');
				}
				else{
					options.push({text:item[group], children: [opt]});
				}
			}
			else{
                options.push(opt);
			}
		});

		return _.sortBy(options, 'text');

	},
	change : function(component, data){
		component.set('v.value', data.id);
        var event = component.getEvent("selectEvent");
		event.setParams({
			'selectedItem': data.data,
			'extra': component.get('v.extra')
		});
		event.fire();
	},
	handleDestroy : function(component, event, helper){
		var select = component.find('pc-select-input');
		var sel = $(select.getElement())
		if(sel.data('select2')){
			sel.select2('destroy')
		}
	}
})