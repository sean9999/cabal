Name:    kabal
Version: 1
Release: 1%{?dist}
Summary: A local area messaging platform

License: Public Domain
Source0: kabal

%description
kabal is a local area messaging platform

%install
mkdir -p %{buildroot}/%{_bindir}
install -p -m 755 %{SOURCE0} %{buildroot}/%{_bindir}

%files
%{_bindir}/kabal

%changelog

