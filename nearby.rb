# Add current dir to load path
$:.unshift "#{File.dirname(__FILE__)}"
require 'rubygems'
require 'erb'
require 'sinatra'

# Main page
get '/' do
  
  # Set up google API key
  @google_api_key = "ABQIAAAA3TJyNtyHXFzfpeoWXERYLRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTtKvzEUj1LJTyhK6Uk1wMXooEwCw"
  
  if !development?
    # For nearby.graysky.org
    @google_api_key = "ABQIAAAA3TJyNtyHXFzfpeoWXERYLRRUtccSZp3IKCvHgz4saYj6njmithRlcFySVmUutIM_Hyu42lF-Q70RYw"
  end
  
  erb :index
end

get '/geocode' do
  
  puts "Params: #{params.inspect}"
  
  status 200
  "Success"
end





