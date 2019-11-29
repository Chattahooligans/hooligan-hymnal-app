REACT_NATIVE_PACKAGER_HOSTNAME = Socket.ip_address_list.find { |ai| ai.ipv4? && !ai.ipv4_loopback? }.ip_address

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  config.vm.provision :shell, path: "vagrant-bootstrap.sh"
  #config.vm.network "public_network", ip: "192.168.1.9"
  config.vm.network "forwarded_port", guest: 19000, host: 19000
  config.vm.network "forwarded_port", guest: 19001, host: 19001
  config.vm.network "forwarded_port", guest: 19002, host: 19002

  config.vm.provision "set_lan_ip", "type": "shell" do |installs|
    installs.inline = "
      echo 'export REACT_NATIVE_PACKAGER_HOSTNAME=#{REACT_NATIVE_PACKAGER_HOSTNAME}' >> /home/vagrant/.bashrc
    "
  end

  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
    v.cpus = 3
  end
end
