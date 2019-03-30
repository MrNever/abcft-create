const ldap = require('ldapjs');

const client = ldap.createClient({
	url: 'ldap://adldap.abcft.com/'
})

var opts = {
	filter: '(sAMAccountName=*)', //查询条件过滤器，查找uid=kxh的用户节点
	scope: 'sub',        //查询范围
	timeLimit: 500       //查询超时
}

client.bind('cn=aop,cn=Users,dc=niub,dc=la', 'P@55word', function (err, res1) {

	if (err) {
		console.log(err)
		return
	}

	//开始查询
	//第一个参数：查询基础路径，代表在查询用户信心将在这个路径下进行，这个路径是由根节开始
	//第二个参数：查询选项
	client.search('dc=niub,dc=la', opts, function (err, res2) {
		//查询结果事件响应
		res2.on('searchEntry', function (entry) {
			//获取查询的对象
			var user = entry.object;
			console.log('user', user);

		})


		//查询错误事件
		res2.on('error', function (err) {
			console.error('error: ' + err.message);
			//unbind操作，必须要做
			client.unbind();
		});

		//查询结束
		res2.on('end', function (result) {
			console.log('search result: ' + result);
			//unbind操作，必须要做
			client.unbind();
		});

	});

})